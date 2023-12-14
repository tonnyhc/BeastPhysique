import { fireEvent, render } from "@testing-library/react-native";
import SubmitButton from "../../../components/common/SubmitButton";

describe("SubmitButton", () => {
  const defaultProps = {
    text: "Test",
    onPress: jest.fn(),
  };

  it("renders correctly with text", () => {
    const { getByText } = render(<SubmitButton {...defaultProps} />);
    expect(getByText(defaultProps.text)).toBeTruthy();
  });

  it("button should be disabled when disabled prop is true'", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <SubmitButton disabled={true} {...defaultProps} onPress={onPressMock} />
    );

    const button = getByText(defaultProps.text);

    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("button should be enabled when disabled prop is false'", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <SubmitButton disabled={false} {...defaultProps} onPress={onPressMock} />
    );

    const button = getByText(defaultProps.text);

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it("button should be enabled by default", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <SubmitButton {...defaultProps} onPress={onPressMock} />
    );

    const button = getByText(defaultProps.text);

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it("button must display text when no loading is passed ", () => {
    const { getByText } = render(<SubmitButton {...defaultProps} />);

    const buttonText = getByText(defaultProps.text);
    expect(buttonText).toBeTruthy();
  });

  it("button must display activity indicator and the text must be hidden when loading is true", () => {
    const onPressMock = jest.fn();
    const { queryByTestId, queryByText, UNSAFE_queryByType } = render(
      <SubmitButton
        text="Submit"
        onPress={onPressMock}
        loading={true}
        testId="submit-button"
      />
    );
    // Check if ActivityIndicator is visible
    const loadingIndicator = queryByTestId("loadingIndicator");
    expect(loadingIndicator).toBeTruthy();

    // Check if text is not visible
    const buttonText = queryByText("Submit");
    expect(buttonText).toBeNull();
  });
});
