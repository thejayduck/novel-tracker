import PageBase from "../components/pageBase";

import { InputFieldNonManaged } from "../components/ui/inputField";

export default function Search() {
    return (
        <PageBase>
            <div>
                <InputFieldNonManaged title="Search" />
                <a><i className='bx bx-filter' /></a>
            </div>
        </PageBase>
    )
}