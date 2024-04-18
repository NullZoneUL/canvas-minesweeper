import { sectionSize } from '../sizes';

const getMapPosition = (position: number) => Math.floor(position / sectionSize);

export default getMapPosition;
