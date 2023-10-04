import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const Width = (num: number) => width * (num / 100);
const Height = (num: number) => height * (num / 100);

export { Width, Height };
