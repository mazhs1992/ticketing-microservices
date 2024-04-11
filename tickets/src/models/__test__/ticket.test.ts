import { Ticket } from "../ticket";

it("implement concurrency control", async () => {
  //create an instance of a ticket

  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  //Save the ticket to the database
  await ticket.save();

  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //make two seperate changes to the ticket we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 20 });

  //save the first fethed ticket
  await firstInstance!.save();
  // save the second fetched ticket and expect an error

  await expect(secondInstance!.save()).rejects.toThrow();
});
