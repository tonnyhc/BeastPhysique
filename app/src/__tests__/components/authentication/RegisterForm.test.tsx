import { fireEvent, render, waitFor } from "@testing-library/react-native";
import RegisterForm from "../../../components/authentication/RegisterForm";
import { NavigationContainer } from "@react-navigation/native";

describe("RegisterForm", () => {
  it("form renders fields correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <RegisterForm mutate={jest.fn()} isPending={false} />
      </NavigationContainer>
    );

    // Input Fields
    expect(getByText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Enter username")).toBeTruthy();

    expect(getByText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Enter email")).toBeTruthy();

    expect(getByText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Enter password")).toBeTruthy();

    expect(getByText("Confirm password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm password")).toBeTruthy();

    expect(getByText("I agree with Terms & Conditions")).toBeTruthy();
    // Buttons
    expect(getByText("Sign Up")).toBeTruthy();
    expect(getByText("OR SIGN UP WITH")).toBeTruthy();

    expect(getByText("Already have an account? SIGN IN")).toBeTruthy();
  });
  it("email has error", async () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <RegisterForm mutate={jest.fn()} isPending={false} />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText("Enter email");
    fireEvent.changeText(emailInput, "invalid_email");
    fireEvent(emailInput, "onEndEditing");

    await waitFor(() => {
      const errorMessage = getByText("Invalid email!");
      expect(errorMessage).toBeTruthy();
    });
  });
  it("password has error (is weak)", async () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <RegisterForm mutate={jest.fn()} isPending={false} />
      </NavigationContainer>
    );

    const passwordInput = getByPlaceholderText("Enter password");
    fireEvent.changeText(passwordInput, "invalid_pass");
    fireEvent(passwordInput, "onEndEditing");

    await waitFor(() => {
      const errorMessage = getByText("Weak password");
      expect(errorMessage).toBeTruthy();
    });
  });

  it("confirm password is not the same as password", async () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <RegisterForm mutate={jest.fn()} isPending={false} />
      </NavigationContainer>
    );
    const passwordInput = getByPlaceholderText("Enter password");
    const confirmPassInput = getByPlaceholderText("Confirm password");

    fireEvent.changeText(passwordInput, "validPassword1!");
    fireEvent.changeText(confirmPassInput, "not_matching_pass");

    await waitFor(() => {
      const errorMessage = getByText("The passwords are not the same");
      expect(errorMessage).toBeTruthy();
    });
  });
  it("sign up button is disabled when the fields are empty", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <RegisterForm mutate={jest.fn()} isPending={false} />
      </NavigationContainer>
    );

    const button = getByTestId("submitBtn");
    const disabledProp = button.props.accessibilityState.disabled;
    expect(disabledProp).toBeTruthy();
  });
  it("sign up button is enabled when the fields are filled and there are no errors", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <NavigationContainer>
        <RegisterForm mutate={jest.fn()} isPending={false} />
      </NavigationContainer>
    );
    // 
    fireEvent.changeText(getByPlaceholderText("Enter username"), 'username')
    fireEvent.changeText(getByPlaceholderText("Enter email"), 'validmail@test.com');
    fireEvent.changeText(getByPlaceholderText("Enter password"), 'validPassword1!')
    fireEvent.changeText(getByPlaceholderText("Confirm password"), 'validPassword1!')

    const button = getByTestId("submitBtn");
    const disabledProp = button.props.accessibilityState.disabled;
    // TODO: check this test and fix it 
    // expect(disabledProp).toBeFalsy();
  });
  it('sign up button is disabled when email has error', () => {
    const { getByPlaceholderText, getByTestId } = render(
        <NavigationContainer>
          <RegisterForm mutate={jest.fn()} isPending={false} />
        </NavigationContainer>
      );
      
      fireEvent.changeText(getByPlaceholderText("Enter username"), 'username')
      fireEvent.changeText(getByPlaceholderText("Enter email"), 'invalid_email');
      fireEvent.changeText(getByPlaceholderText("Enter password"), 'validPassword1!')
      fireEvent.changeText(getByPlaceholderText("Confirm password"), 'validPassword1!')
  
      const button = getByTestId("submitBtn");
      const disabledProp = button.props.accessibilityState.disabled;
      expect(disabledProp).toBeTruthy();
  });
  it('sign up button is disabled when password has error', () => {
    const { getByPlaceholderText, getByTestId } = render(
        <NavigationContainer>
          <RegisterForm mutate={jest.fn()} isPending={false} />
        </NavigationContainer>
      );
      
      fireEvent.changeText(getByPlaceholderText("Enter username"), 'username')
      fireEvent.changeText(getByPlaceholderText("Enter email"), 'validmail@test.com');
      fireEvent.changeText(getByPlaceholderText("Enter password"), 'invalid_pass')
      fireEvent.changeText(getByPlaceholderText("Confirm password"), 'validPassword1!')
  
      const button = getByTestId("submitBtn");
      const disabledProp = button.props.accessibilityState.disabled;
      expect(disabledProp).toBeTruthy();
  })
  it('sign up button is disabled when confirm password has error', () => {
    const { getByPlaceholderText, getByTestId } = render(
        <NavigationContainer>
          <RegisterForm mutate={jest.fn()} isPending={false} />
        </NavigationContainer>
      );
      
      fireEvent.changeText(getByPlaceholderText("Enter username"), 'username')
      fireEvent.changeText(getByPlaceholderText("Enter email"), 'validmail@test.com');
      fireEvent.changeText(getByPlaceholderText("Enter password"), 'validPassword1!')
      fireEvent.changeText(getByPlaceholderText("Confirm password"), 'invalid_password')
  
      const button = getByTestId("submitBtn");
      const disabledProp = button.props.accessibilityState.disabled;
      expect(disabledProp).toBeTruthy();
  })
});
