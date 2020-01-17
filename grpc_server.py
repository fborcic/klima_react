from concurrent import futures
import logging

import grpc

import klima_pb2
import klima_pb2_grpc
import ac

HEAT_LIMITS = {'minTemperature':16, 'maxTemperature':30}
COOL_LIMITS = {'minTemperature':18, 'maxTemperature':30}

def request_to_quadrostate(request):
    return ac.QuadroState(powered_on=request.power,
                          mode=request.mode,
                          temperature=request.temperature,
                          speed=request.speed,
                          ionizer=request.ionizer,
                          swing=request.swing,
                          turbo=request.turbo)

def send_state_to_quadro(state):
    print(ac.state_to_message(state))


class AirConditionerServicer(klima_pb2_grpc.AirConditionerServicer):
    def __init__(self):
        self.last_set = response = klima_pb2.StateResponse(temperature=22,
                                                           mode=0,
                                                           ionizer=False,
                                                           turbo=False,
                                                           swing=False,
                                                           speed=0,
                                                           power=False,
                                                           **COOL_LIMITS)
    def SetState(self, request, context):
        quadrostate = request_to_quadrostate(request)
        send_state_to_quadro(quadrostate)

        limits = HEAT_LIMITS if request.mode==ac.HEAT else COOL_LIMITS

        response = klima_pb2.StateResponse(temperature=request.temperature,
                                           mode=request.mode,
                                           ionizer=request.ionizer,
                                           turbo=request.turbo,
                                           swing=request.swing,
                                           speed=request.speed,
                                           power=request.power,
                                           **limits)
        self.last_set = response
        return response

    def GetState(self, request, context):
        return self.last_set

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))
    klima_pb2_grpc.add_AirConditionerServicer_to_server(
        AirConditionerServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
