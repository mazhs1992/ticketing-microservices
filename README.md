
SET UP A SERVICE

    1. set up your server
    2. containerize it
    3. create infra/k8s/<service>-depl.yaml with deployment + service
    4. implement skaffold 
    5. minikube start --driver=docker
    6. skaffold dev

Set up ingress for communication of the out word with your  Pods
    1. Go to ingress-nginx 
    2. on deployment get kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml
    3. create a ingress-srv.yaml 
    4. Redirect out localhost to ticketing.dev
        a. code /etc/hosts  (*)






TROUBLESHOOTING
- (*) if you get "zsh: command not found: code" --> https://stackoverflow.com/questions/74634438/code-command-not-found-in-vs-code-on-mac

- minikube addons enable ingress


INGRESS
    1.  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml
    2.  kubectl get pods --namespace=ingress-nginx  
    3.  on chroome type 'thisisunsafe'