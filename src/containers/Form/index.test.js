import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";


describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(()=> screen.findByText("Envoyer"), {timeout: 3000})
      // await screen.findByText("Envoyer");

    
      // SetTimeout me rend tous les test positifs donc mauvaise idée MAIS le findByText fonctionne une fois sur deux, sûrement à cause du délai d'affichage entre "En cours" et "Envoyer"

      expect(onSuccess).toHaveBeenCalled();
      
      
    });
  });
});
