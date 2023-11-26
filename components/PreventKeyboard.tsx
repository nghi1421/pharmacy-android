import { ReactNode } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Props {
  children: ReactNode;
}

export const PreventKeyboard: React.FC<Props> = ({ children }) => {
    <SafeAreaView
        style={{ flex: 1 }}
    >
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20
    }
})