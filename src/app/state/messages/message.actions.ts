export namespace Message {
    export class Add {
        static readonly type = "[Message] Add Message";
        constructor(public message: string) { }
    }

    export class Clear {
        static readonly type = "[Message] Clear Messages";
    }
}