import { useCallback, useEffect, useState } from 'react';
import { useAppDispath } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { handleSortPriceUpAction, handleSortPriceDownAction, handleSortRatingAction, handleSortPopularAction } from '../../store/offers-process/offers-process';
import './sort-offers.css';


function SortOffers(){


  const {currentCity} = useAppSelector((state) => ({...state.offers}));
  const dispath = useAppDispath();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('popular');

  useEffect(() => {
    setActiveSort('popular');
    setIsOpen(false);
  }, [currentCity]);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const changeSortLowToUpHandler = useCallback(
    (sort: string) => {
      setIsOpen(!isOpen);
      setActiveSort(sort);
      dispath(handleSortPriceUpAction());
    }, [dispath, isOpen]
  );

  const changeSortHighToLowHandler = useCallback(
    (sort: string) => {
      setIsOpen(!isOpen);
      setActiveSort(sort);
      dispath(handleSortPriceDownAction());
    }, [dispath, isOpen]
  );

  const changeSortRatingHandler = useCallback(
    (sort: string) => {
      setIsOpen(!isOpen);
      setActiveSort(sort);
      dispath(handleSortRatingAction());
    }, [dispath, isOpen]
  );

  const changeSortPopularHandler = useCallback(
    (sort: string) => {
      setIsOpen(!isOpen);
      setActiveSort(sort);
      dispath(handleSortPopularAction());
    }, [dispath, isOpen]
  );
  return (
    <form className={`places__sorting ${isOpen ? 'isOpen' : ''}`} action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={clickHandler} className="places__sorting-type" tabIndex={0}>
        {activeSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li className="places__option places__option--active" tabIndex={0} onClick={() => changeSortPopularHandler('Popular')}>
          Popular
        </li>
        <li className="places__option" tabIndex={0} onClick={() => changeSortLowToUpHandler('Price: low to high')}>
          Price: low to high
        </li>
        <li className="places__option" tabIndex={0} onClick={() => changeSortHighToLowHandler('Price: high to low')}>
          Price: high to low
        </li>
        <li className="places__option" tabIndex={0} onClick={() => changeSortRatingHandler('Top rated first')}>
          Top rated first
        </li>
      </ul>
    </form>
  );
}


export default SortOffers;
