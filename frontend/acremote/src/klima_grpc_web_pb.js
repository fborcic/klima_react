/**
 * @fileoverview gRPC-Web generated client stub for acremote
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.acremote = require('./klima_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.acremote.AirConditionerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.acremote.AirConditionerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.acremote.StateRequest,
 *   !proto.acremote.StateResponse>}
 */
const methodDescriptor_AirConditioner_SetState = new grpc.web.MethodDescriptor(
  '/acremote.AirConditioner/SetState',
  grpc.web.MethodType.UNARY,
  proto.acremote.StateRequest,
  proto.acremote.StateResponse,
  /**
   * @param {!proto.acremote.StateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.acremote.StateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.acremote.StateRequest,
 *   !proto.acremote.StateResponse>}
 */
const methodInfo_AirConditioner_SetState = new grpc.web.AbstractClientBase.MethodInfo(
  proto.acremote.StateResponse,
  /**
   * @param {!proto.acremote.StateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.acremote.StateResponse.deserializeBinary
);


/**
 * @param {!proto.acremote.StateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.acremote.StateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.acremote.StateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.acremote.AirConditionerClient.prototype.setState =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/acremote.AirConditioner/SetState',
      request,
      metadata || {},
      methodDescriptor_AirConditioner_SetState,
      callback);
};


/**
 * @param {!proto.acremote.StateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.acremote.StateResponse>}
 *     A native promise that resolves to the response
 */
proto.acremote.AirConditionerPromiseClient.prototype.setState =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/acremote.AirConditioner/SetState',
      request,
      metadata || {},
      methodDescriptor_AirConditioner_SetState);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.acremote.Void,
 *   !proto.acremote.StateResponse>}
 */
const methodDescriptor_AirConditioner_GetState = new grpc.web.MethodDescriptor(
  '/acremote.AirConditioner/GetState',
  grpc.web.MethodType.UNARY,
  proto.acremote.Void,
  proto.acremote.StateResponse,
  /**
   * @param {!proto.acremote.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.acremote.StateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.acremote.Void,
 *   !proto.acremote.StateResponse>}
 */
const methodInfo_AirConditioner_GetState = new grpc.web.AbstractClientBase.MethodInfo(
  proto.acremote.StateResponse,
  /**
   * @param {!proto.acremote.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.acremote.StateResponse.deserializeBinary
);


/**
 * @param {!proto.acremote.Void} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.acremote.StateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.acremote.StateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.acremote.AirConditionerClient.prototype.getState =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/acremote.AirConditioner/GetState',
      request,
      metadata || {},
      methodDescriptor_AirConditioner_GetState,
      callback);
};


/**
 * @param {!proto.acremote.Void} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.acremote.StateResponse>}
 *     A native promise that resolves to the response
 */
proto.acremote.AirConditionerPromiseClient.prototype.getState =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/acremote.AirConditioner/GetState',
      request,
      metadata || {},
      methodDescriptor_AirConditioner_GetState);
};


module.exports = proto.acremote;

