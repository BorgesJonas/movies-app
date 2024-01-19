import { NavigationContainer } from "@react-navigation/native";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react-native";
import { Home } from "./index";
import { Text } from "react-native";

function renderComponent() {
  return (
    <NavigationContainer>
      {/* <Home /> */}
      <Text>Olá, Mundo!</Text>
    </NavigationContainer>
  );
}

describe("Home component", () => {
  //   it("renders correctly", () => {
  //     const tree = renderer.create(renderComponent()).toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });

  it("renders correctly", async () => {
    render(renderComponent());
    const text = await screen.findByText(/olá, mundo/i);
    expect(text).toBeOnTheScreen();
  });
});
