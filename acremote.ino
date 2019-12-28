#define INIT_PULSE 3000
#define INIT_DELAY 9000
#define PULSE 500
#define PWM_PIN 11
#define MSG_BITS 56
#define MSG_LEN_NUL 15
#define ONE 1500
#define ZERO 500

#define C_ON() TCCR2A |= _BV (COM2A0);
#define C_OFF() TCCR2A &= ~(_BV (COM2A0));

unsigned char delays[MSG_BITS];
char recv;
char message[MSG_LEN_NUL];

void setup() {
  Serial.begin(9600);
  pinMode(PWM_PIN, OUTPUT);
 
  TCCR2A = _BV(WGM21);
  TCCR2B = _BV(CS20);
  OCR2A =  209; //221;
}

void prepare_ir(){
  int i,j;
  unsigned char current;
  for(i=MSG_LEN_NUL-2;i>=0;i--){
    if('0' <= message[i] && message[i] <= '9')
        current = message[i] - '0';
    else
        current = message[i] - 'A' + 0xA;
    for(j=0;j<4;j++){
        delays[(MSG_LEN_NUL-2-i)*4+j] = current & (1<<j);
    }
  }
}

void send_ir(){
  int i;
  C_ON();
  delayMicroseconds(INIT_PULSE);
  C_OFF();
  delayMicroseconds(INIT_DELAY);

  C_ON();
  delayMicroseconds(PULSE);
  C_OFF();
  for(i=0;i<MSG_BITS;i++){
    delayMicroseconds(delays[i]?ONE:ZERO);
    C_ON();
    delayMicroseconds(PULSE);
    C_OFF();
  }
}

void loop() {
  recv = Serial.read();
  if(recv == '.'){
    Serial.readBytes(message, MSG_LEN_NUL-1);
    message[MSG_LEN_NUL-1] = 0;
    Serial.write("Recv: ");
    Serial.write(message);
    Serial.write("\n");
    prepare_ir();
    send_ir();
  }
}
