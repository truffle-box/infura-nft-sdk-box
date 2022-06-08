import React, { useContext } from 'react';
import { EthProvider } from '../ethereum';

const Contract = () => {
    const { contract } = useContext(EthProvider);
};

export default Contract;
