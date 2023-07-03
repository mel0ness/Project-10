import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = { 
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("gives me the last event", () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockReturnValue(data);
      
      const byDateDesc = data?.focus.sort((evtA, evtB) =>
        new Date(evtB.date) - new Date(evtA.date)
      );
    expect(byDateDesc[0].title).toBe("World Gaming Day");
  });
  it("gives me the last event 2", () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockReturnValue(data);
      
      const byDateDesc = data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
    );
    expect(byDateDesc[0].title).toBe("World Gaming Day");
  });
  
  it("Change the good value of index", () => {

  });
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
    await screen.findByText("World Gaming Day");
  });
});
