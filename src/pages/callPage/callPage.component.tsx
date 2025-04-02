import CustomCard from '@/components/ui/customCard/customCard.component';
import Divider from '@/components/ui/divider/divider';
import { JSX } from 'react';
import * as Containers from './callPage.container';
import { CallPageContainerArgs } from './callPage.types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { t } from 'i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { callPageStyle } from './callPage.style';

const CallPage = (): JSX.Element => {
  return (
    <Containers.CallPageContainer>
      {(containerProps: CallPageContainerArgs): JSX.Element => {
        return (
          <div className={callPageStyle.container}>
            <h1 className={callPageStyle.title}>{t('callPage.pageTitle', { callName: 'Call Q4' })}</h1>
            <h2 className={callPageStyle.subtitle}>{t('callPage.pageSubtitle')}</h2>

            <div className={callPageStyle.cardsContainer}>
              <CustomCard
                cardStyle="w-[35%]"
                header={<h1 className={callPageStyle.cardsTitle}>{t('callPage.promptCard.title')}</h1>}
              >
                <div className="w-[100%]">
                  <Divider className="bg-gray-300" />
                  <Form {...containerProps.form}>
                    <form
                      onSubmit={containerProps.form.handleSubmit(containerProps.actions.onSubmit)}
                      className={callPageStyle.form}
                    >
                      <FormField
                        control={containerProps.form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={callPageStyle.formLabels}>
                              {t('callPage.promptCard.formLabels.name')}
                            </FormLabel>
                            <FormControl className="w-[100%]">
                              <Input className="h-10" {...containerProps.form.register('name')} {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={containerProps.form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="w-[100%]">
                            <FormLabel className={callPageStyle.formLabels}>
                              {t('callPage.promptCard.formLabels.phone')}
                            </FormLabel>
                            <FormControl>
                              <Input className="h-10" {...containerProps.form.register('phone')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={containerProps.form.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem className="w-[100%]">
                            <FormLabel className={callPageStyle.formLabels}>
                              {t('callPage.promptCard.formLabels.prompt')}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="h-60"
                                cols={30}
                                {...containerProps.form.register('prompt')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className={callPageStyle.buttonsContainer}>
                        <Button variant="outline">{t('callPage.promptCard.buttons.cancel')}</Button>

                        <Button type="submit" className="bg-green-500">
                          {t('callPage.promptCard.buttons.startCall')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </CustomCard>

              <CustomCard
                cardStyle="w-[35%]"
                header={<h1 className={callPageStyle.cardsTitle}>{t('callPage.transcriptionCard.title')}</h1>}
              >
                <div>
                  <Divider className="bg-gray-300" />

                  <Form {...containerProps.form}>
                    <form
                      onSubmit={containerProps.form.handleSubmit(containerProps.actions.onSubmit)}
                      className={callPageStyle.form}
                    >
                      <FormField
                        control={containerProps.form.control}
                        name="transcription"
                        render={({ field }) => (
                          <FormItem className="w-[100%] flex flex-col items-center">
                            <FormLabel className="text-gray-500">
                              {t('callPage.transcriptionCard.formLabels.transcription')}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...containerProps.form.register('transcription')}
                                {...field}
                                className="h-105"
                                rows={60}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button className="bg-green-500">{t('callPage.transcriptionCard.buttons.finishCall')}</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </CustomCard>
            </div>
          </div>
        );
      }}
    </Containers.CallPageContainer>
  );
};

export default CallPage;
