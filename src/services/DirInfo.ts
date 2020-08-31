export interface DirInfoParamsType {
    url: string;
    showParent?: boolean;
    extension?: string[];
    filterStr?: string;
}

export interface DirItemType {
    pathString: string;
    linkString: string;
    name: string;
    externsion: string;
    isDir: boolean;
}

export async function listDirItems(request: DirInfoParamsType): Promise<DirItemType[]> {
    try {
        var data: DirItemType[] = [];
        var response = await fetch(request.url);
        var html = await response.text();
        var temp = document.createElement("temp");
        temp.innerHTML = html;
        var items = Array.from(temp.getElementsByTagName("a"));
        if (!request.showParent) {
            items = items.filter((item) => {
                return item.innerText.trim() !== "Parent Directory";
            });
        }

        items.forEach((item) => {
            let itemStr = item.innerText.trim();
            let nameStr = itemStr.replace("/", "")
            if (request.filterStr !== undefined && request.filterStr.length > 0 &&
                itemStr !== "Parent Directory" && itemStr.indexOf(request.filterStr) < 0 ) {
                return;
            }
            data.push({
                pathString: itemStr,
                linkString: '/' + nameStr,
                name: nameStr,
                // file start with . not consider it has extension
                externsion: nameStr.lastIndexOf(".") > 0 ? nameStr.substring(nameStr.lastIndexOf(".")) : "",
                isDir: itemStr.indexOf("/") > 0 || itemStr === "Parent Directory"
            })
        });
        temp.remove();
        return data;
    }
    catch (err) {
        console.log('fetch failed', err);
        throw err;
    }
}

export async function listFiles(request: DirInfoParamsType): Promise<DirItemType[]> {
    try {
        var data: DirItemType[] = [];
        var response = await fetch(request.url);
        var html = await response.text();
        var temp = document.createElement("temp");
        temp.innerHTML = html;
        var items = Array.from(temp.getElementsByTagName("a"));

        items.forEach((item) => {
            let itemStr = item.innerText.trim();
            let nameStr = itemStr.replace("/", "");
            // file start with . not consider it has extension
            let extStr = nameStr.lastIndexOf(".") > 0 ? nameStr.substring(nameStr.lastIndexOf(".")) : "";

            // exclude dir
            if (itemStr.indexOf("/") > 0 || itemStr === "Parent Directory") {
                return;
            }
            // exclude other files if extension specified
            if (request.extension !== undefined && request.extension !== null &&
                request.extension.length > 0 && !request.extension.includes(extStr)) {
                return;
            }
            if (request.filterStr !== undefined && request.filterStr.length > 0 &&
                itemStr !== "Parent Directory" && itemStr.indexOf(request.filterStr) < 0 ) {
                return;
            }
            data.push({
                pathString: itemStr,
                linkString: '/' + nameStr,
                name: nameStr,
                // file start with . not consider it has extension
                externsion: extStr,
                isDir: false
            })
        });
        temp.remove();
        return data;
    }
    catch (err) {
        console.log('fetch failed', err);
        throw err;
    }
}

export async function listSubDirs(request: DirInfoParamsType): Promise<DirItemType[]> {
    try {
        var data: DirItemType[] = [];
        var response = await fetch(request.url);
        var html = await response.text();
        var temp = document.createElement("temp");
        temp.innerHTML = html;
        var items = Array.from(temp.getElementsByTagName("a"));
        if (!request.showParent) {
            items = items.filter((item) => {
                return item.innerText.trim() !== "Parent Directory";
            });
        }

        items.forEach((item) => {
            let itemStr = item.innerText.trim();
            let nameStr = itemStr.replace("/", "");
            // exclude file
            if (itemStr.indexOf("/") < 0 && itemStr !== "Parent Directory") {
                return;
            }
            if (request.filterStr !== undefined && request.filterStr.length > 0 &&
                itemStr !== "Parent Directory" && itemStr.indexOf(request.filterStr) < 0 ) {
                return;
            }
            data.push({
                pathString: itemStr,
                linkString: '/' + nameStr,
                name: nameStr,
                externsion: "",
                isDir: true
            })
        });
        temp.remove();
        return data;
    }
    catch (err) {
        console.log('fetch failed', err);
        throw err;
    }
}
