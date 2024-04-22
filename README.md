#  INFO

This is a project from course "Microservices with Node JS and React" by Stephen Grider. 


# SET UP A SERVICE

    1. set up your server
    2. containerize it
    3. create infra/k8s/<service>-depl.yaml with deployment + service
    4. implement skaffold
    5. minikube start --driver=docker
    6. skaffold dev

 #### Set up ingress for communication of the out word with your Pods :

    1.  Go to ingress-nginx https://kubernetes.github.io/ingress-nginx/deploy/
    2.  Get command to install the Ingress-Nginx Controller:  `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml` 
    3.  Create a ingress-srv.yaml 
    4.  Redirect out localhost to ticketing.dev
            a. nano /etc/hosts 

# CREATE A SECRET

    1.
        kubectl create secret generic jwt-secret --from-literal=JWT_KEY==asdf
        kubectl get secrets

    2.
        On your -depl.yaml on container part
        env:
            - name: JWT_KEY
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: JWT_KEY



# EVENT BUS 

    1. create your deployment
    2. Create your project
    3. Port forward of our NATS to test it
        INFO: There are 3 ways to do this
        1. kubectl get pods  --> get your pod name
        2. kubectl port-forward nats-depl-8c7858c49-vnjcf  4222:4222  (port on my machine):(port of the node)
        3. on other terminal --> npm run publish
