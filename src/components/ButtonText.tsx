import { Button as NativeBaseButton, Heading, IButtonProps } from 'native-base'

type Props = IButtonProps & {
  title: string
}

export function ButtonText({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      bg="transparent"
      h={14}
      fontSize="sm"
      rounded={25}
      _pressed={{ bg: 'transparent' }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  )
}
