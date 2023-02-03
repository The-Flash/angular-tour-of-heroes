import { Hero } from "src/features/shared/@types";

export namespace Heroes {
    export class LoadAll {
        static readonly type = "[Hero] Load Heroes";
    }

    export class LoadAllSuccess {
        static readonly type = "[Hero] Load All Heroes Success";
        constructor(public heroes: Hero[]) { }
    }

    export class LoadAllFailure {
        static readonly type = "[Hero] Load All Heroes Failure";
    }

    export class Add {
        static readonly type = "[Hero] Add Hero";

        constructor(public data: { name: string }) { }
    }

    export class AddSuccess {
        static readonly type = "[Hero] Add Hero Success";

        constructor(public hero: Hero) { }
    }

    export class AddFailure {
        static readonly type = "[Hero] Add Hero Failure";
    }

    export class Delete {
        static readonly type = "[Hero] Delete Hero";

        constructor(public id: number) { }
    }

    export class DeleteSuccess {
        static readonly type = "[Hero] Delete Hero Success";

        constructor(public id: number) { }
    }

    export class DeleteFailure {
        static readonly type = "[Hero] Delete Hero Failure";
    }

    export class Update {
        static readonly type = "[Hero] Update Hero";
        constructor(public id: number, public name: string) { }
    }

    export class UpdateSuccess {
        static readonly type = "[Hero] Update Hero success";
        constructor(public hero: Hero) { }
    }
    export class UpdateFailure {
        static readonly type = "[Hero] Update Hero Failure";
    }
}