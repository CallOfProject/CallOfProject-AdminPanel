#include <stdio.h>
#include <math.h>
int dc(int number)
{
    return (int) log10(number) + 1;
}
int main()
{
    printf("digit count is: %d", dc(33));
    return 0;
}