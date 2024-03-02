"use client"

import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Product } from "@prisma/client"

type ManageClientProps = {
    products: Product[]
}

const ManageClient: React.FC<ManageClientProps> = ({ products }) => {

    let rows: any = []

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                image: product.image
            }
        })
    }
    // GridColDef[] bunu vermemizin sebebi field , width gibi ozelliklerin tanimli gelmesi icin 
    const columns: GridColDef[] = [
        { field: 'id', headerName: "ID", width: 200 },
        { field: 'name', headerName: "Name", width: 150 },
        { field: 'price', headerName: "Price", width: 100 },
        { field: 'category', headerName: "Category", width: 100 },
        { field: 'brand', headerName: "Brand", width: 100 },
        {
            field: 'inStock',
            headerName: "inStock",
            width: 100,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.inStock == true ? "Stokta Mevcut" : "Stokta Yok"}
                    </div>
                )
            }

        },
    ]

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}

export default ManageClient