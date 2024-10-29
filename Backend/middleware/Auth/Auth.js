import { checkToken } from '../../utils/JWT/jwt';
import { db } from "../../Services/db";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const authToken = req.headers.authorization || req.headers.Authorization;

    if (!authToken) {
        return res.status(401).json({ error: 'Unauthorized without token' });
    }

    try {
        const token = authToken.replace("Bearer ", "").trim();
        const verifiedToken = checkToken(token);

        if (!verifiedToken || !verifiedToken.UserId) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const params = {
            TableName: process.env.TABLE_NAME_USERS,
            Key: {
                UserId: verifiedToken.UserId
            }
        };
        const user = await db.get(params);

        if (!user.Item) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = {
            UserId: verifiedToken.UserId,
            username: user.Item.username
        };
        next();
    } catch (error) {
        console.log(error, "Token is not valid. Unauthorized.");
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export default authMiddleware;
