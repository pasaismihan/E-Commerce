"use client"

const Category = () => {

    const categoryList = [
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
        { name: "ayakkabı" },
    ]

    return (
        <div className="flex items-center justify-center gap-3 md:gap-10 my-5 md:my-10 overflow-x-auto">
            {categoryList.map((category,index)=>(
            <div className="border text-slate-500 rounded-full min-w-[100px]" key={index}>{category.name}</div>
        ))}</div>
    )
}

export default Category