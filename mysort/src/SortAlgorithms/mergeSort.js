export function getMergeSortAnimations(array)
{
    console.log(array)
    const animation=[];
    if(array.length<=1)
    return array;
    const auxiliaryArray=array.slice();
    console.log(auxiliaryArray);
    mergeSortHelper(array,0,array.length-1,auxiliaryArray,animation);
    console.log(animation)
    return animation;
}

function mergeSortHelper(mainArray,start,end,auxiliaryArray,animation)
{
    if(start===end)return;
    const mid=Math.floor((start+end)/2);
    mergeSortHelper(auxiliaryArray,start,mid,mainArray,animation);
    mergeSortHelper(auxiliaryArray,mid+1,end,mainArray,animation);
    doMergeSort(mainArray,start,mid,end,auxiliaryArray,animation);
}

function doMergeSort(mainArray,start,mid,end,auxiliaryArray,animation)
{
    let k=start;
    let i=start;
    let j=mid+1;
    while(i<=mid && j<=end)
    {
        animation.push([i,j,true,false]);
        animation.push([i,j,true,true]);
        if(auxiliaryArray[i]<=auxiliaryArray[j])
        {
            animation.push([k,auxiliaryArray[i],false,false]);
            mainArray[k++]=auxiliaryArray[i++]
        }
        else
        {
            animation.push([k,auxiliaryArray[j],false,false]);
            mainArray[k++]=auxiliaryArray[j++];
        }
    }


    while(i<=mid)
    {
        animation.push([i,i,true,false]);
        animation.push([i,i,true,true]);
        animation.push([k,auxiliaryArray[i],false,false]);
        mainArray[k++]=auxiliaryArray[i++];
    }

    while(j<=end)
    {
        animation.push([j,j,true,false]);
        animation.push([j,j,true,true]);
        animation.push([k,auxiliaryArray[j],false,false]);
        mainArray[k++]=auxiliaryArray[j++];
    }
}

