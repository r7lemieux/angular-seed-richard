import {DynamoDB} from "aws-sdk";
import {nextIdsTableParams} from '../shared/id/nextIds-dynamo';

const tablesParams: DynamoDB.Types.CreateTableInput[] = [nextIdsTableParams];

export default tablesParams;


