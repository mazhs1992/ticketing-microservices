import {Subjects, Publisher, ExpirationCompleteEvent } from '@vm92tickets/common'


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;


}