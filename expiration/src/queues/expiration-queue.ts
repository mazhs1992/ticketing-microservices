import Queue from "bull";

interface Payload {
    orderId:string;
}

const expirationQueue = new Queue<Payload>('order:expiration',{
    redis:{
        host:process.env.REDIS_HOST
    }
})

// CODE THAT Will be executed when the 15 minutes have passed

expirationQueue.process(async (job) =>{
    console.log(`Event for ${job.data.orderId}`)
})

export {expirationQueue}