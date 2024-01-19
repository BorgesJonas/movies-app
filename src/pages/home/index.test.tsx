import { NavigationContainer } from "@react-navigation/native";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react-native";
import { Home } from "./index";

function renderComponent() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}

describe("Home component", () => {
  //   it("renders correctly", () => {
  //     const tree = renderer.create(renderComponent()).toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });

  it("renders correctly", () => {
    render(renderComponent());
    const text = screen.queryByText(/o que você quer assistir hoje/);
    expect(text).toBeDefined();
  });
});
