/**
 * @swagger
 * /login:
 *   get:
 *     summary: Greet the world
 *     description: Returns a greeting message.
 *     responses:
 *       200:
 *         description: A greeting message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export const getLogin = async (request, reply) => {
  return reply.status(200).send({ message: "hello Welcome to pawpal!"})
}
