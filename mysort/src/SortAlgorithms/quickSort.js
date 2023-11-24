export function getQuickSortAnimations(array)
{
  let n=array.length ;   
  const animations=[];
  Quicksort(array,0,n-1,animations);
  return animations
}

function Quicksort(arr,start,end,animations)
{
   if (start >=end) return;

   let pivotIdx=Partion(arr,start,end,animations);
   animations.push([pivotIdx,pivotIdx,true,false]);
   animations.push([pivotIdx,pivotIdx,true,true]);

   Quicksort(arr,start,pivotIdx-1,animations);

   Quicksort(arr,pivotIdx+1,end,animations);

   return arr
}

function Partion(arr,start,end,animations)
{
    const pivotValue=arr[start];
    let swapIndex=start;

    for(let i=start+1;i<=end;i++)
    { 
        animations.push([start,start,true,false]);
        animations.push([start,start,true,true]);
        animations.push([i,i,true,false]);
        animations.push([i,i,true,true]);
        if(pivotValue>arr[i])
        {
            swapIndex++;
            if(i!==swapIndex)
            {
                [arr[i],arr[swapIndex]]=[arr[swapIndex],arr[i]];
                animations.push([i,i,true,false]);
                animations.push([i,i,true,true]);
                animations.push([swapIndex,swapIndex,true,false]);
                animations.push([swapIndex,swapIndex,true,true]); 
                animations.push([i,arr[i],false,false]);
                animations.push([swapIndex,arr[swapIndex],false,false]);
            }
        }
    }

    if(start!==swapIndex)
    {
        [arr[start],arr[swapIndex]]=[arr[swapIndex],arr[start]];
        animations.push([start,start,true,false]);
        animations.push([start,start,true,true]);
        animations.push([swapIndex,swapIndex,true,false]);
        animations.push([swapIndex,swapIndex,true,true]); 
        animations.push([start,arr[start],false,false]);
        animations.push([swapIndex,arr[swapIndex],false,false]);
    }

    return swapIndex

}