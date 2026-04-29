'use client'
// Dynamically routed pages for individual items
import { usePathname } from 'next/navigation';
import SingleProductCard from '@/app/components/ProductComps-Layouts/ProductPages/SingleProduct';
import TransitionSlide from '@/app/components/transitions-navigation/transitionWipe';
import { ProductPagesProvider } from '@/app/components/ProductComps-Layouts/ProductPages/ProductPagesContext';
import ApparelPopup from '@/app/components/ProductComps-Layouts/ProductPages/ApparelPopup';

const ProductDetailPage = () => {
    const pathname = usePathname(); // get pathname: '/apparel/[handle]
    const handle = pathname.replace(/^\/collections\/[^/]+\//, ''); // get handle from pathname
    
    return (
      <>
      <ProductPagesProvider>
        <div>
          <ApparelPopup />
          <SingleProductCard handle={handle} />
        </div>
      </ProductPagesProvider>
      <TransitionSlide />
      </>
    );
}

export default ProductDetailPage;