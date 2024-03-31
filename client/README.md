1. Set up your dependencies
2. try setting up a local server
3. Create dockerfile + build
4. Push image to hub
5. Set up Develoment - Service
6. Set up Skafold
7. Set up Ingress

---

When sending axios request from client to another Pod you may face errors with this approach.

     url: "/api/users/signup"

to solve it we can send our request to ingress and then ingress will redirect it

Create the url to send request to ingress

    1. Find ingress namespace   -->  `kubectl get namespaces` --> ingress-nginx
    2. Get services of ingress  -->  `kubectl get services -n ingress-nginx`
    3. Get the loadbalancer name  --> ingress-nginx-controller
    4. Add `.svc.cluster.local` at the end

    URL: http://ingress-nginx.ingress-nginx-controller.svc.cluster.local

You can also create a `external name service` that will redirect you request

---

✗ npx prettier . --write
