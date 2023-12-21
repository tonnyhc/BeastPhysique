import { render } from "@testing-library/react-native";
import Login from "../../../../screens/authentication/Login";
import { NavigationContainer } from "@react-navigation/native";

describe("Login", () => {
  it("Renders successfully and displaying welcome message", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
    expect(getByText("Welcome back 👋")).toBeTruthy();
  });
});
