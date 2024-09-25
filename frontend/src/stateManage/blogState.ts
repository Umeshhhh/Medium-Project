import { atom, RecoilState } from "recoil";

export const blogId: RecoilState<string> = atom({
    key: 'blogId',
    default: ''
})