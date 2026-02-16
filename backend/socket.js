import User from "./models/user.model.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("identity", async ({ userId }) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          {
            socketId: socket.id,
            isOnline: true,
          },
          { new: true },
        );
      } catch (error) {
        console.error("Error updating user socket ID:", error);
      }
    });

    socket.on(
      "updateLocation",
      async ({ latitude, longitude, userId, orderId }) => {
        try {
          const user = await User.findByIdAndUpdate(userId, {
            location: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            isOnline: true,
            socketId: socket.id,
          });
          if (user) {
            // Broadcast to all clients (or use orderId to target specific room if implemented)
            io.emit("updateDeliveryLocation", {
              deliveryBoyId: userId,
              latitude,
              longitude,
            });
          }
        } catch (error) {
          console.error("Error updating delivery location:", error);
        }
      },
    );

    socket.on("disconnect", async () => {
      try {
        await User.findOneAndUpdate(
          {
            socketId: socket.id,
          },
          {
            socketId: null,
            isOnline: false,
          },
        );
      } catch (error) {
        console.error("Error updating user socket ID on disconnect:", error);
      }
    });
  });
};
