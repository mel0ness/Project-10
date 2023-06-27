import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
 

      // await screen.findByText("Message envoyé !");
      await waitFor(()=> screen.findByText("Message envoyé !"), {timeout: 3000})

    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    // to implement
  })
  it("a list a people is displayed", async () => {
    // to implement
  })
  it("a footer is displayed", () => {
    render(<Home />);
 
    const contact = screen.getByText(/Contactez-nous/);
    const adresse = screen.getByText(/45 avenue de la République, 75000 Paris/);
    const tel = screen.getByText(/01 23 45 67 89/);
    expect(contact).toBeInTheDocument();
    expect(adresse).toBeInTheDocument();
    expect(tel).toBeInTheDocument();

    
  });

//   it("an event card, with the last event, is displayed", async () => {
//     // window.console.error = jest.fn();
//     // api.loadData = jest.fn().mockReturnValue(data);
//     render(
//       // <DataProvider>
//         <Home/>
//       // </DataProvider>
//     );
//     const boom = await screen.("AOÛT");
//     expect(boom).toBeInTheDocument();
//     // await screen.findByText("AOÛT");
// // expect((EventCard).props.label).toBe("boom");

//   })
});
