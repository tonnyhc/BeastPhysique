import { render } from "@testing-library/react-native"
import BackButton from "../../../components/common/BackButton"

describe("BackButton", () => {
    it("renders successfully", () => {
        const {getByTestId} = render(<BackButton onPress={jest.fn()}/>);
        expect(getByTestId('backButton')).toBeTruthy();
    })
})