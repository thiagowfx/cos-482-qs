package br.ufrj.cos482.web.rest;

import br.ufrj.cos482.Cos482App;

import br.ufrj.cos482.domain.LogDoSistema;
import br.ufrj.cos482.repository.LogDoSistemaRepository;
import br.ufrj.cos482.service.LogDoSistemaService;
import br.ufrj.cos482.service.dto.LogDoSistemaDTO;
import br.ufrj.cos482.service.mapper.LogDoSistemaMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufrj.cos482.domain.enumeration.Funcoes;
/**
 * Test class for the LogDoSistemaResource REST controller.
 *
 * @see LogDoSistemaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Cos482App.class)
public class LogDoSistemaResourceIntTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneId.of("Z"));


    private static final ZonedDateTime DEFAULT_TIMESTAMP_FUNCAO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_TIMESTAMP_FUNCAO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_TIMESTAMP_FUNCAO_STR = dateTimeFormatter.format(DEFAULT_TIMESTAMP_FUNCAO);

    private static final Funcoes DEFAULT_FUNCAO = Funcoes.CADASTRAR_ALUNO;
    private static final Funcoes UPDATED_FUNCAO = Funcoes.DESCADASTRAR_ALUNO;
    private static final String DEFAULT_USERNAME = "AAAAA";
    private static final String UPDATED_USERNAME = "BBBBB";

    @Inject
    private LogDoSistemaRepository logDoSistemaRepository;

    @Inject
    private LogDoSistemaMapper logDoSistemaMapper;

    @Inject
    private LogDoSistemaService logDoSistemaService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restLogDoSistemaMockMvc;

    private LogDoSistema logDoSistema;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        LogDoSistemaResource logDoSistemaResource = new LogDoSistemaResource();
        ReflectionTestUtils.setField(logDoSistemaResource, "logDoSistemaService", logDoSistemaService);
        this.restLogDoSistemaMockMvc = MockMvcBuilders.standaloneSetup(logDoSistemaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LogDoSistema createEntity(EntityManager em) {
        LogDoSistema logDoSistema = new LogDoSistema()
                .timestampFuncao(DEFAULT_TIMESTAMP_FUNCAO)
                .funcao(DEFAULT_FUNCAO)
                .username(DEFAULT_USERNAME);
        return logDoSistema;
    }

    @Before
    public void initTest() {
        logDoSistema = createEntity(em);
    }

    @Test
    @Transactional
    public void createLogDoSistema() throws Exception {
        int databaseSizeBeforeCreate = logDoSistemaRepository.findAll().size();

        // Create the LogDoSistema
        LogDoSistemaDTO logDoSistemaDTO = logDoSistemaMapper.logDoSistemaToLogDoSistemaDTO(logDoSistema);

        restLogDoSistemaMockMvc.perform(post("/api/log-do-sistemas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(logDoSistemaDTO)))
                .andExpect(status().isCreated());

        // Validate the LogDoSistema in the database
        List<LogDoSistema> logDoSistemas = logDoSistemaRepository.findAll();
        assertThat(logDoSistemas).hasSize(databaseSizeBeforeCreate + 1);
        LogDoSistema testLogDoSistema = logDoSistemas.get(logDoSistemas.size() - 1);
        assertThat(testLogDoSistema.getTimestampFuncao()).isEqualTo(DEFAULT_TIMESTAMP_FUNCAO);
        assertThat(testLogDoSistema.getFuncao()).isEqualTo(DEFAULT_FUNCAO);
        assertThat(testLogDoSistema.getUsername()).isEqualTo(DEFAULT_USERNAME);
    }

    @Test
    @Transactional
    public void getAllLogDoSistemas() throws Exception {
        // Initialize the database
        logDoSistemaRepository.saveAndFlush(logDoSistema);

        // Get all the logDoSistemas
        restLogDoSistemaMockMvc.perform(get("/api/log-do-sistemas?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(logDoSistema.getId().intValue())))
                .andExpect(jsonPath("$.[*].timestampFuncao").value(hasItem(DEFAULT_TIMESTAMP_FUNCAO_STR)))
                .andExpect(jsonPath("$.[*].funcao").value(hasItem(DEFAULT_FUNCAO.toString())))
                .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())));
    }

    @Test
    @Transactional
    public void getLogDoSistema() throws Exception {
        // Initialize the database
        logDoSistemaRepository.saveAndFlush(logDoSistema);

        // Get the logDoSistema
        restLogDoSistemaMockMvc.perform(get("/api/log-do-sistemas/{id}", logDoSistema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(logDoSistema.getId().intValue()))
            .andExpect(jsonPath("$.timestampFuncao").value(DEFAULT_TIMESTAMP_FUNCAO_STR))
            .andExpect(jsonPath("$.funcao").value(DEFAULT_FUNCAO.toString()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLogDoSistema() throws Exception {
        // Get the logDoSistema
        restLogDoSistemaMockMvc.perform(get("/api/log-do-sistemas/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLogDoSistema() throws Exception {
        // Initialize the database
        logDoSistemaRepository.saveAndFlush(logDoSistema);
        int databaseSizeBeforeUpdate = logDoSistemaRepository.findAll().size();

        // Update the logDoSistema
        LogDoSistema updatedLogDoSistema = logDoSistemaRepository.findOne(logDoSistema.getId());
        updatedLogDoSistema
                .timestampFuncao(UPDATED_TIMESTAMP_FUNCAO)
                .funcao(UPDATED_FUNCAO)
                .username(UPDATED_USERNAME);
        LogDoSistemaDTO logDoSistemaDTO = logDoSistemaMapper.logDoSistemaToLogDoSistemaDTO(updatedLogDoSistema);

        restLogDoSistemaMockMvc.perform(put("/api/log-do-sistemas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(logDoSistemaDTO)))
                .andExpect(status().isOk());

        // Validate the LogDoSistema in the database
        List<LogDoSistema> logDoSistemas = logDoSistemaRepository.findAll();
        assertThat(logDoSistemas).hasSize(databaseSizeBeforeUpdate);
        LogDoSistema testLogDoSistema = logDoSistemas.get(logDoSistemas.size() - 1);
        assertThat(testLogDoSistema.getTimestampFuncao()).isEqualTo(UPDATED_TIMESTAMP_FUNCAO);
        assertThat(testLogDoSistema.getFuncao()).isEqualTo(UPDATED_FUNCAO);
        assertThat(testLogDoSistema.getUsername()).isEqualTo(UPDATED_USERNAME);
    }

    @Test
    @Transactional
    public void deleteLogDoSistema() throws Exception {
        // Initialize the database
        logDoSistemaRepository.saveAndFlush(logDoSistema);
        int databaseSizeBeforeDelete = logDoSistemaRepository.findAll().size();

        // Get the logDoSistema
        restLogDoSistemaMockMvc.perform(delete("/api/log-do-sistemas/{id}", logDoSistema.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<LogDoSistema> logDoSistemas = logDoSistemaRepository.findAll();
        assertThat(logDoSistemas).hasSize(databaseSizeBeforeDelete - 1);
    }
}
