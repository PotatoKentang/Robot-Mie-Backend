import { RobotStatus } from "types";
import { sendCommandToRobot } from "./send-command-to-robot";

const HEADER_REQUEST = "80000200000000640000"
const CHECK_CONVEYOR = "0101820078000001";
const CHECK_STATUS_ROBOT = "0101820079000001";
export const getServerResponse = async (): Promise<RobotStatus> => {
        const conveyorAddress: string = HEADER_REQUEST + CHECK_CONVEYOR;

        // try {
        //     const conveyorStatus: number = await sendCommandToRobot(conveyorAddress);
        //     if (conveyorStatus !== 0) {
        //         return RobotStatus.cooking;
        //     }
        // } catch (error) {
        //     console.log("conveyor error", error);
        //     return RobotStatus.error;
        // }

        const robotAddress: string = HEADER_REQUEST + CHECK_STATUS_ROBOT;

        try {
            const robotStatus: number = await sendCommandToRobot(robotAddress);
            if(robotStatus === 0) return RobotStatus.idle;
            else if (robotStatus === 1) return RobotStatus.cooking;
            else if (robotStatus === 2) return RobotStatus.error;
        } catch (error) {
            console.log("robot error", error);
            return RobotStatus.cooking;
        }
        return RobotStatus.cooking;
}