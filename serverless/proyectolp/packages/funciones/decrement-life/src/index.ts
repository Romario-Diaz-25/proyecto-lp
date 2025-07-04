import { EventBridgeEvent } from "aws-lambda";

export const handler = async (
  event: EventBridgeEvent<string, any>
): Promise<void> => {
  const baseUrl = "https://ib7takzn07.execute-api.us-east-1.amazonaws.com";

  if (!baseUrl) {
    console.error(
      "SERVICE_BASE_URL no está definida en las variables de entorno."
    );
    return;
  }

  console.log("Evento Recibido:", JSON.stringify(event, null, 2));

  try {
    const response = await fetch(
      `${baseUrl}/v1/students/${event.detail.id}/decrement-lifes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseBody = await response.json();
    console.log("Respuesta API:", responseBody);
  } catch (error) {
    console.error("No se pudo llamar al servicio ECS:", error);
  }
};
