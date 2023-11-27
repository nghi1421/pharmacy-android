import { Alert } from "react-native";

const createConfirmation = (title: string, message: string, submit: () => void) =>
    Alert.alert(title, message, [
    {
        text: 'Quay về',
        onPress: () => {},
        style: 'cancel',
    },
    {
        text: 'Đồng ý', onPress: () => submit()
    },
]);

export {
    createConfirmation
}