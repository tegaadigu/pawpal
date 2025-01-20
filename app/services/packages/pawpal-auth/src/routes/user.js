/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Retrieve a user
 *     description: Retrieves an already created user
 *     operationId: getUser
 *     parameters: 
 *      - in: path
 *        name: userId
 *        required: true
 *        schema: 
 *          type: string
 *        description: The unique identifier for a user
 *     responses:
 *       200:
 *         description: Retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                email: 
 *                  type: string
 */
export const getUser = async (request, reply) => {
  return reply.status(200).send({ user: {id: '12332'}})
}