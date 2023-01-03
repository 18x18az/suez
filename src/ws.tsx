import { Websocket } from "@18x18az/ouija";

const server = "bifrost.18x18az.org";

const bifrost_url = `wss://${server}`

export const bifrost = new Websocket(bifrost_url);