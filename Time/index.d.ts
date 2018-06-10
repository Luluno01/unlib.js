import { Timer } from './Timer';
import { sleep } from './sleep';
declare var Time: {
    Timer: typeof Timer;
    sleep: typeof sleep;
};
export default Time;
