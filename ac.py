from collections import namedtuple

COOL = 'C'
HEAT = 'H'
DRY = 'D'
FAN = 'F'

LOW = 1
MID = 2
HIGH = 3
AUTO = 0

MODE_MAPPING = {COOL: '1',
                HEAT: '4',
                DRY: '2',
                FAN: '3'}

FAN_MAPPING = {LOW: '5',
               MID: '9',
               HIGH: 'B',
               AUTO: '1'}

CHKSUM_CONSTANT = 0xfd

TEMP_OFFSET = 16

QuadroState = namedtuple('QuadroState', ['powered_on',
                                         'mode',
                                         'temperature',
                                         'speed',
                                         'ionizer',
                                         'swing',
                                         'turbo'])

def popcount(hex_str):
    return sum(bin(int(c, 16)).count('1') for c in hex_str)

def correct_checksum(message):
    cnt = popcount(message[:9])
    chksum = CHKSUM_CONSTANT - cnt
    return message[:9] + '%02X'%chksum + message[12:]

def state_to_message(state):
    s = state
    message = ['F' if s.powered_on else 'C',
               '4' if s.ionizer else '0',
               MODE_MAPPING[s.mode],
               FAN_MAPPING[s.speed],
               '%01X'%(s.temperature - TEMP_OFFSET),
               '0',
               'F' if s.swing else 'A',
               '0', '0', '2', '0', '1']
    return correct_checksum(''.join(message))



