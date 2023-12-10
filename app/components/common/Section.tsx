import { ReactNode } from "react";
import { View } from "react-native"

interface SectionProps {
    children:ReactNode
}

const Section:React.FC<SectionProps> = ({children}) => {
    return (
        <View style={{paddingLeft: 12, paddingRight: 12, flex: 1}}>
            {children}
        </View>
    )
}
export default Section;