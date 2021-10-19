import http from './http'
import config from './config'

export const getMovie = (page, size) => http.get('doubans', {
    page: page,
    size: size
});
export const getWallpaper = (page, size) => http.get("wallpapers", {
    page: page,
    size: size,

});

//获取不同纯度和种类的壁纸，并按观看次数由高到低排列
export const getWallpaperByType = (purity, category, page, size) => http.get("wallpapers/search/type", {
    purity: purity,
    category: category,
    page: page,
    size: size,

});


//获取不同纯度和种类的壁纸，并按上传时间由高到低排列,不返回页数，返回时间更快
export const getWallpaperByTypeList = (purity, category, page, size) => http.get("wallpaper/type-list", {
    purity: purity,
    category: category,
    page: page,
    size: size,

});

//获取不同纯度和种类的壁纸，并按上传时间由高到低排列
export const getWallpaperByTypeOrderTime = (purity, category, page, size) => http.get("wallpapers/search/type-time", {
    purity: purity,
    category: category,
    page: page,
    size: size,

});

//模糊搜索不同tag的壁纸，并按观看次数由高到低排列
export const getWallpaperByTags = (tags, purity, category, page, size) => http.get("wallpapers/search/tags-search", {
    tags: tags,
    purity: purity,
    category: category,
    page: page,
    size: size,

});

//模糊搜索不同tag的壁纸，并按观看次数由高到低排列
export const getWallpaperByTagsList = (tags, purity, category, page, size) => http.get("wallpaper/tag-list", {
    tags: tags,
    purity: purity,
    category: category,
    page: page,
    size: size,

});

export const getAnimations = (page, size) => http.get("animations", {
    page: page,
    size: size
})

export const getWallpaperByID = (imgKey) => http.get("wallpapers/search/imgKey", {
    imgKey: imgKey
})