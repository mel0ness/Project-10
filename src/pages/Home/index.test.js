import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import EventCard from "../../components/EventCard";
import EventList from "../../containers/Events";


const data = {
  events: [
       { id: 1,
        type: "conférence",
        date: "2022-04-29T20:28:45.744Z",
        title: "User&product MixUsers",
        cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
        description: "Présentation des nouveaux usages UX.",
        nb_guesses: 900,
        periode: "14-15-16 Avril",
        prestations: [
            "1 espace d’exposition",
            "1 scéne principale",
            "1 espace de restaurations"
        ], },
        {
          id: 2,
          type: "expérience digitale",
          date: "2022-01-29T20:28:45.744Z",
          title: "#DigitonPARIS",
          cover: "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
          description: "Présentation des outils analytics aux professionnels du secteur ",
          nb_guesses: 1300,
          periode: "24-25-26 Février",
          prestations: [
              "1 espace d’exposition",
              "1 scéne principale",
              "1 site web dédié"
          ]
      },
      {
        id: 4,
        type: "conférence",
        date: "2022-08-29T20:28:45.744Z",
        title: "Conférence #productCON",
        cover: "/images/headway-F2KRf_QfCqw-unsplash.png",
        description: "Présentation des outils analytics aux professionnels du secteur ",
        nb_guesses: 1300,
        periode: "24-25-26 Février",
        prestations: [
            "1 espace d’exposition",
            "1 scéne principale",
            "2 espaces de restaurations",
            "1 site web dédié"
        ]
    }, ], };

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

afterEach(cleanup)

  it("a list of events is displayed", async () => {
        window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    
          render(
      <DataProvider>
        <EventList />
      </DataProvider>
    );
  

    const titleElement = await screen.findByText(data.events[1].title);
    expect(titleElement).toBeInTheDocument();
    const type = await screen.findByText("expérience digitale");
    expect(type).toBeInTheDocument();
  })

  it("gives me the last event!", () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    
    const byDate = data?.events.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  ); 
  const last = byDate? byDate[0] : null;

  expect(last.id).toBe(4);

});

  it("a list a people is displayed", async () => {
    render(<Home />);
 
    const nameOne = screen.getByText(/Samira/);
    const role = screen.getByText(/Animateur/);
    const nameTwo = screen.getByText(/Isabelle/);
    expect(nameOne).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(nameTwo).toBeInTheDocument();
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

  it("an event card, with the last event, is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    
          render(
      <DataProvider>
      <EventCard title={data.events[0].title} />
      </DataProvider>
    );

    expect(data.events[0].title).toBe("Conférence #productCON")


        const titleElement = await screen.findByText(data.events[0].title);


       expect(titleElement).toBeInTheDocument();

  })
});
