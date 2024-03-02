
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import WarningText from '../../components/WarningText';
import AuthContainer from '../../components/containers/AuthContainer';
import ManageClient from '@/app/components/admin/ManageClient';
import getProducts from '@/app/actions/getProducts';

const Manage = async () => {
    const products = await getProducts({ category: null })
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
        return <WarningText text="Buraya Girişin Yasak !" />;
    }
    return (
        <div className='w-3/4 mt-3 mr-3'>
            <ManageClient products={products} />
        </div>
    )
}

export default Manage