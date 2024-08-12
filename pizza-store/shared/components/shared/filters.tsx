'use client'
import React from 'react';

import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useIngredients } from '@/shared/hooks/use-ingredients';
import { useFilters } from '@/shared/hooks/use-filters';
import { useQueryFilters } from '@/shared/hooks/use-query-filters';
import { cn } from '@/shared/lib/utils';



interface Props {
  className?: string;
}


export const Filters: React.FC<Props> = ({ className }) => {
  const { loading, items } = useIngredients();
  const ingredientsAll = items.map((item) => ({ value: String(item.id), text: item.name }))
  const filters = useFilters();

  useQueryFilters(filters);
  const updatePrice = (prices: [number, number]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  }

  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size='sm' className='mb-5 font-bold' />
      <div className='flex flex-col gap-4'>
        <CheckboxFiltersGroup
          title="Тип теста"
          name="pizzaTypes"
          className="mb-5"
          onClickCheckbox={filters.tooglePizzaTypes}
          selected={filters.pizzaTypes}
          items={[
            { text: 'Тонкое', value: '1' },
            { text: 'Традиционное', value: '2' },
          ]}
        />

        <CheckboxFiltersGroup
          title="Размеры"
          name="sizes"
          className="mb-5"
          onClickCheckbox={filters.toogleSizes}
          selected={filters.sizes}
          items={[
            { text: '20 см', value: '20' },
            { text: '30 см', value: '30' },
            { text: '40 см', value: '40' },
          ]}
        />
      </div>
      {/* price filter */}
      <div className='mt-5 border-y-neutral-100 py-6 pb-7'>
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom) || '0'}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo) || '1000'}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]} onValueChange={([priceFrom, priceTo]) => updatePrice([priceFrom, priceTo])} />
      </div>
      <CheckboxFiltersGroup
        title='Ингредиенты'
        className='mt-5'
        limit={6}
        defaultItems={ingredientsAll.slice(0, 6)}
        items={
          ingredientsAll
        }
        loading={loading}
        onClickCheckbox={filters.toggleSelectedIngredients}
        selected={filters.selectedIngredients}
        name="ingredients"
      />


    </div>
  )
}