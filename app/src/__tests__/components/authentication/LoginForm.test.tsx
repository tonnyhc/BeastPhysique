import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import LoginForm from "../../../components/authentication/LoginForm";

describe("LoginForm", () => {
  it("Renders correct fields", () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <LoginForm onLogin={jest.fn()} isPending={false} loginError="" />
      </NavigationContainer>
    );
    expect(getByText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Enter email")).toBeTruthy();
    expect(getByText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Enter password")).toBeTruthy();

    expect(getByText("Forgot password?")).toBeTruthy();
    // Buttons
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("OR SIGN IN WITH")).toBeTruthy();

    expect(getByText("Don't have an account? SIGN UP")).toBeTruthy();
  });
  it("sign in button is disabled when the fields are empty", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <LoginForm onLogin={jest.fn()} loginError="" isPending={false} />
      </NavigationContainer>
    );

    const button = getByTestId("submitBtn");
    const disabledProp = button.props.accessibilityState.disabled;
    expect(disabledProp).toBeTruthy();
  });
});
